import { Signup } from "../../_components/Signup.form";

export default function PageRegister() {
 return <Signup path={`${process.env.PATHNAME}`} />
}