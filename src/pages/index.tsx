/**
 * This component is the index page of the application.
 * It redirects the user to the '/films' page.
 */
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/films',
      permanent: false,
    },
  };
}

export default function Index() {
  return null;
}