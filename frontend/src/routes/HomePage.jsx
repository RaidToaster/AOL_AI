import React, { useRef, useState, useEffect } from 'react';

const HomePage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [emotions, setEmotions] = useState([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    }, []);

    const captureFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL('image/jpeg');
            sendToBackend(image);
        }
    };

    const sendToBackend = async (image) => {
        try {
            const base64Image = image.split(',')[1];
            const response = await fetch('http://127.0.0.1:5000/detect_emotion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image }),
            });
            const data = await response.json();
            setEmotions(data.emotions || []);
        } catch (err) {
            console.error('Error sending frame to backend: ', err);
        }
    };

    useEffect(() => {
        const interval = setInterval(captureFrame, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white" style={{ backgroundImage: "url('/src/assets/background.jpg')", backgroundSize: 'cover' }}>
            <div className="container mx-auto px-4 py-8" >
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            Emotion Detection AI
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Experience real-time emotion recognition powered by advanced AI.
                            Our system analyzes facial expressions to detect various emotional states instantly.
                        </p>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
                        <div className="relative rounded-lg overflow-hidden border-2 border-gray-700">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                            />
                            <canvas
                                ref={canvasRef}
                                className="hidden"
                            />
                            {emotions.map((emo, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        top: `${emo.y}px`,
                                        left: `${emo.x}px`,
                                        width: `${emo.w * 2}px`,
                                        height: `${emo.h * 2}px`,
                                        transform: 'scale(1)',
                                    }}
                                    className="border border-white"
                                >
                                    <div className="absolute -top-8 left-0 bg-black px-2 py-1 text-sm rounded-md border border-white">
                                        {emo.emotion}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                            <div className="bg-black p-4 rounded-lg border border-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Detection Speed</h3>
                                <p className="text-gray-300">100ms refresh rate</p>
                            </div>
                            <div className="bg-black p-4 rounded-lg border border-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Emotions Tracked</h3>
                                <p className="text-gray-300">7 distinct states</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;