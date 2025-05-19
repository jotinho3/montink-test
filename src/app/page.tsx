import { HomeComponent } from "@/app/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HomeComponent />
      {/* Outros conteúdos da home podem ser adicionados aqui */}
    </div>
  );
}