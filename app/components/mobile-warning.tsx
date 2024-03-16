import { messages } from '@/utils/constants';

const MobileWarning = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
      {messages.mobileWarning}
    </div>
  );
};

export default MobileWarning;
