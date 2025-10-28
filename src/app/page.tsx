import TypingWindow from '@/components/typingWindow/TypingWindow';
import '../styles/globals.css';
import Layout from '@/app/Layout';

const Page = (): JSX.Element => {
  return (
    <Layout>
      <TypingWindow></TypingWindow>
    </Layout>
  );
};

export default Page;
