import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Separator} from "@/components/ui/separator.tsx";

export default function Index() {
    const [roomName, setRoomName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])

    const navigate = useNavigate();

    const handleJoin = () => {
        const errors: string[] = [];
        if (!username) {
            errors.push("Username is required");
        }
        if (!roomName) {
            errors.push("Room name is required");
        }
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }
        const url = `/${roomName}/${username}`
        navigate(url)
    }

    return (
        <section className="flex items-center justify-center h-screen w-screen">
            <Card className={"w-full max-w-md p-8"}>
                <CardHeader className="text-2xl ">
                    Red Tetris - Join room
                    </CardHeader>
                <CardContent className="">
                    <Input type="text" placeholder="Room name*" className="mb-4" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    <Input type="text" placeholder="Username*" className="mb-4" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Button onClick={handleJoin} >Join</Button>
                    {errors.length > 0 && (
                        <Separator className="mt-2 mb-2"></Separator>
                    )}
                    {errors.map((error) => (
                        <p className="text-red-400">{error}</p>
                    ))}
                </CardContent>
            </Card>
        </section>
    )
}