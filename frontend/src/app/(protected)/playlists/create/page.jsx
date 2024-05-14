'use client'
import Link from "next/link";
import {useEffect, useState} from "react";
import Draggable from "react-draggable";
import PlaylistForm from "@/components/forms/playlist";
import {PlaylistApi} from "../../../../../api/playlist";
import {useVideoStore} from "../../../../../stores/useVideoStore";

export default function PlaylistCreatePage() {
    const [playlist, setPlaylist] = useState({
        name: '',
        description : '',
        isPublished: true,
        videos: []
    });
    const videos = useVideoStore.use.videos()

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await PlaylistApi.getAll()
            useVideoStore.setState({videos: data.videos})
        }
        fetchVideos()
    }, [])

    useEffect(() => {
        const savedPlaylist = localStorage.getItem('playlist');
        if (savedPlaylist) {
            setPlaylist(JSON.parse(savedPlaylist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('playlist', JSON.stringify(playlist));
    }, [playlist]);

    const addVideoToPlaylist = (video) => {
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            videos: [...prevPlaylist.videos, video]
        }));
    };

    const removeVideoFromPlaylist = (index) => {
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            videos: prevPlaylist.videos.filter((_, i) => i !== index)
        }));
    };

    const submitPlaylist = async () => {
        await PlaylistApi.create(data).then((response) => {
            if (response.ok) {
                console.log('Playlist created successfully');
                setPlaylist({ name: '', description: '', isPublished: true, videos: [] });
                localStorage.removeItem('playlist');
            }
        });
    };

    const totalDuration = playlist.videos.reduce((acc, video) => acc + video.duration, 0);



    return (
        <section className="flex flex-col w-full h-full rounded-2xl justify-center shadow-2xl">
            <div className="bg-slate-500">
                <div className="container mx-auto">
                    <h1 className="text-3xl text-white py-4 ">Create a new stream</h1>
                    <hr className="border-b-1 border-blueGray-300 pb-6"/>
                    <div>
                        <Link href={"/playlists"}>Back to Playlists</Link>
                    </div>
                </div>


                <PlaylistForm
                    name={playlist.name}
                    isPublished={playlist.isPublished}
                    setPublished={(value) => setPlaylist((prevPlaylist) => ({...prevPlaylist, value}))}
                    setName={(name) => setPlaylist((prevPlaylist) => ({ ...prevPlaylist, name }))}
                    description={playlist.description}
                    setDescription={(value) => setPlaylist((prevPlaylist) => ({...prevPlaylist, value}))}
                    submitPlaylist={submitPlaylist}
                />

                <h2>Add Videos to Playlist</h2>

                {videos?.length === 0 && <p>No video available</p>}
                {videos?.map((video, index) => (
                    <div key={index}>
                        <p>{video.title}</p>
                        <p>Durée : {video.duration} s</p>
                        <button onClick={() => addVideoToPlaylist(video)}>Add to Playlist</button>
                    </div>
                ))}

                <div className="rows">
                    <h2>Current Playlist</h2>
                    <div>
                        <p>Durée totale de la playlist : {totalDuration} s</p>
                    </div>
                    <Draggable axis="y" handle=".handle" defaultPosition={{x: 0, y: 0}} position={null} grid={[25, 25]}
                               scale={1}>
                        <ul>
                            {playlist.videos.map((element, index) => (
                                <li key={index} className="handle">
                                    {element.title} - {element.duration}
                                    <button onClick={() => removeVideoFromPlaylist(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </Draggable>
                </div>
            </div>
        </section>
    )
}