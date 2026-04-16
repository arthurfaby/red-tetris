import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useParams} from "react-router";
import { useState} from "react";
import {Avatar, AvatarBadge, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Room() {
    const { roomName, username } = useParams()
    const [users, setUsers] = useState<string[]>(['Player 1', 'Player 2', 'Player 3', 'Player 4']);

    const addPlayer = (usernameToAdd: string | undefined) => {

        if (usernameToAdd && !users.includes(usernameToAdd)) {
            setUsers([...users, usernameToAdd])
        }
    }

    addPlayer(username);


    return (
        <section className="flex items-center justify-center h-screen w-screen">
            <Card className={"w-full max-w-md p-8"}>
                <CardHeader className="text-2xl ">
                    Red Tetris - {roomName}
                </CardHeader>
                <CardContent className="">
                    {users.length > 0 ? (<div className="grid grid-cols-3 gap-4 justify-center">
                        {users.map(user => {
                            const userSplit = user.toUpperCase().split(" ");
                            const userFallback = (userSplit[0].at(0) ?? '') + (userSplit[1]?.at(0) ?? '')
                            return (
                                <div  key={user} className="flex items-center ">
                                    <div className="flex items-center gap-2">

                                    <Avatar >
                                        <AvatarBadge className="bg-green-500"></AvatarBadge>
                                        <AvatarFallback>{userFallback}</AvatarFallback>
                                    </Avatar>
                                    <p>{user}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <Button className="col-span-3">Start game</Button>

                    </div>) : (
                        <p className="text-red-400">ERROR. SHOULD NOT HAPPEN.</p>
                    )}
                </CardContent>
            </Card>
        </section>
    )
}