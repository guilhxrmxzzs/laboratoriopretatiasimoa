import { supabase } from "./supabase/supabaseIndex"

async function puxarAlunos(){
    const res = await supabase
    .from('corpodocente')
    .select('*')

    if(res.error){
        console.log(res.error)
    }else{
        alert('deu bom')
        return res.data
    }
}