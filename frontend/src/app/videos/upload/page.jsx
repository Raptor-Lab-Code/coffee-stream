'use client'
import { useState } from 'react';
import GuestVideoUploadForm from "#components/forms/guest/videoUpload.js";
import VideoPreview from "#components/videos/preview.jsx";
import {GuestApi} from "#api/guest.js";

export default function GuestVideoUploadPage() {
    const [videoFile, setVideoFile] = useState('');

    const handleSubmitForm = async (value) => {
        await GuestApi.create(value).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <section className="flex flex-col w-full h-full rounded-2xl justify-center shadow-2xl">
            <div className="bg-slate-500">
                <header className="container mx-auto">
                    <h1 className="text-3xl text-white py-4">Upload your own video</h1>
                    <hr className="border-b-1 border-blueGray-300 pb-6"/>
                </header>

                <div>
                    {videoFile.length > 0 && (
                        <VideoPreview videoUrl={videoFile}/>
                    )}

                    <GuestVideoUploadForm
                        setVideoFile={setVideoFile}
                        onSubmitForm={handleSubmitForm}
                    />
                </div>

                </div>
        </section>
    )
}