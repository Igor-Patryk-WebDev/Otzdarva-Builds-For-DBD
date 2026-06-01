import { Link } from "@tanstack/react-router";

type Props = {}

export default function Button({ }: Props) {
    return (
        <button className="pointer border-3"><Link to='/'>WRUĆ</Link></button>
    );
}