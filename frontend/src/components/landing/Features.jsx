import {
  Languages,
  Mic,
  Shield,
  Activity,
} from "lucide-react";

const features = [

["Multilingual","Hindi • English • Hinglish",Languages],

["Voice Assistant","Speak Naturally",Mic],

["Emergency Alerts","Immediate Guidance",Shield],

["Disease Awareness","Verified Information",Activity],

];

export default function Features(){

return(

<section className="max-w-7xl mx-auto px-8 py-24">

<h2 className="text-5xl font-black text-center">

Everything You Need

</h2>

<p className="text-center text-slate-500 mt-5">

Designed especially for rural healthcare.

</p>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

{features.map(([title,desc,Icon])=>(

<div
key={title}
className="rounded-3xl bg-white/25 backdrop-blur-xl border border-white p-8 hover:-translate-y-3 transition duration-500 shadow-xl"
>

<Icon className="text-blue-600"/>

<h3 className="font-bold text-xl mt-6">

{title}

</h3>

<p className="text-slate-500 mt-3">

{desc}

</p>

</div>

))}

</div>

</section>

);

}