import {createClient} from "@/app/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        const {data: keymaps, error: keymapsError} = await supabase
            .from("keymaps")
            .select(`
                *,
            `)
            .order("created_at", {ascending: false});

        if (keymapsError) {
            return NextResponse.json({error: keymapsError.message}, {status: 400});
        }

        return NextResponse.json({data: keymaps || []});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}