import '../styles/index.css';
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';
import { useAppLogic } from '../hooks/useAppLogic';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showScrollTopButton, handleScrollToTop } = useAppLogic(router);

  const isAdminRoute = pathname.slice(0, 7) === '/admin/';

  return (
    <AuthProvider>
      {isAdminRoute ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}

      {showScrollTopButton && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: "#A9A8B6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          ↑
        </button>
      )}
    </AuthProvider>
  );
}

export default MyApp;
