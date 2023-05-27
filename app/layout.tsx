import ActiveStatus from "./components/ActiveStatus";
import AuthContex from "./contex/AuthContex";
import ToasterContex from "./contex/ToasterContex";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "MsgChat",
    description: "Created by Bharat",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AuthContex>
                    <ToasterContex />
                    <ActiveStatus />
                    {children}
                </AuthContex>
            </body>
        </html>
    );
}
