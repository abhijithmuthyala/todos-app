import TodosFormAndList from "@/components/todo/TodosFormAndList";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { ContentWrapper, Logo } from "@/components/utils";

export default async function Home() {
  return (
    <>
      <main>
        <header className="bg-hero min-h-hero-mobile bg-cover bg-no-repeat bg-blend-multiply md:min-h-hero-desktop">
          <ContentWrapper>
            <h1 className="sr-only uppercase">
              Manage your tasks with a simple interface
            </h1>
            <div className="my-12 flex items-center justify-between sm:min-h-10 md:my-18">
              <Logo />
              <ToggleThemeButton />
            </div>
          </ContentWrapper>
        </header>
        <TodosFormAndList />
      </main>
    </>
  );
}

export const metadata = {
  title: "Todo App",
  description:
    "Manage your tasks with a simple interface and boost your productivity",
};
