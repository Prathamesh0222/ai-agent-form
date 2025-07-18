import { Input } from "./Input";
import { Label } from "./Label";

export const FormInput = () => {
  return (
    <div className="flex flex-col space-y-3 items-center">
      <div className="w-3/4">
        <Label htmlFor="username">Username</Label>
        <Input />
      </div>
      <div className="w-3/4">
        <Label htmlFor="Email">Email</Label>
        <Input />
      </div>
      <div className="w-3/4">
        <Label htmlFor="LinkedinURL">Linkedin URL</Label>

        <Input />
      </div>
      <div className="w-3/4">
        <Label htmlFor="GithubURL">Github URL</Label>

        <Input />
      </div>
      <button className="p-2 mt-2 border border-border/50 w-3/4 rounded-lg font-semibold bg-white text-black text-sm cursor-pointer hover:bg-white/80 duration-300">
        Submit
      </button>
    </div>
  );
};
