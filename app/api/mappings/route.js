import {createClient} from "@/app/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        const {data: mappings, error: mappingsError} = await supabase
            .from("mappings")
            .select(`
                *
            `)
            .order("created_at", {ascending: false})
            .limit(24)

        if (mappingsError) {
            return NextResponse.json({error: mappingsError.message}, {status: 400});
        }

        return NextResponse.json({mappings: mappings || []});
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}