const whitelist = [ "http://localhost:3000", "https://example.com" ];

type callbackType = (error : Error | null, allow? : boolean) => void;

const corsOptions = {
    origin: (origin : string | undefined, callback: callbackType) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export default corsOptions;