import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CodeGuardDog from "@/assets/CodeGuardDog.png";
import { Bolt, FileBox, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center gap-6 mx-auto">
      <div className="topSection bg-gray-800 rounded-b-2xl px-5 w-full h-[52vh]">
        <div className="flex justify-center items-center h-full">
          <div className="leftSection w-[60%] flex flex-col items-start">
            <h1 className="text-5xl font-bold mb-6 text-left">
              Transform Your Code <br /> into  Perfection
            </h1>
            <p className="mb-8 text-xl text-gray-300 text-left">
              Automate code quality checks effortlessly and take your projects <br />
              to the next level!
            </p>
            <div className="flex justify-center space-x-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/explore">Explore</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/demo">Try demo</Link>
              </Button>
            </div>
          </div>
          <div className="rightSection w-[40%] h-full">
            <Image
              src={CodeGuardDog}
              alt="Code Guard Dog"
              className="h-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="bottomSection grid grid-cols-2 md:grid-cols-4 gap-6 w-full h-[17vh]">
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-center items-center text-center">
          <Bolt className="text-orange-500 w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">Synchronize Files</h3>
          <p className="text-gray-400">
            Easily synchronize your files across multiple devices.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-center items-center text-center">
          <FileBox className="text-orange-500 w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">Make your Configurations</h3>
          <p className="text-gray-400">
            Create and manage your configurations effortlessly.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-center items-center text-center">
          <Shield className="text-orange-500 w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">Secure Storage</h3>
          <p className="text-gray-400">
            Keep your code safe with our secure storage solutions.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-center items-center text-center">
          <Users className="text-orange-500 w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">Collaborate</h3>
          <p className="text-gray-400">
            Work together with your team seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
