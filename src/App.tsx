import { Articles } from "@/components/articles/articles";
import { Layout } from "@/components/layouts/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Articles />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
