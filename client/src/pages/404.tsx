import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

export default function PageNotFound() {
    return (
        <section className="flex items-center justify-center h-screen w-screen">
            <Card className={"w-full max-w-md p-8"}>
                <CardHeader className="text-2xl ">
                    404 - Page Not Found
                </CardHeader>
                <CardContent className="">
                    <p className="text-sm italic">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Button variant={"default"} className="mt-4">
                        <NavLink to="/" >Go back to Home</NavLink>
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}