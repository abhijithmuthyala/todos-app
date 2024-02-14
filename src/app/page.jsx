import TodosFormAndList from "@/components/todo/TodosFormAndList";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { ContentWrapper, Logo } from "@/components/utils";

export default async function Home() {
  return (
    <>
      <main>
        <header className="min-h-48 bg-hero bg-blend-multiply">
          <ContentWrapper>
            <h1 className="sr-only uppercase">
              Manage your tasks with a simple interface
            </h1>
            <div className="flex items-center justify-between py-12">
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
