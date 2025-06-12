import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';

type FormButtonsProps = {
  text?: string;
  isSubmitting?: boolean;
};

const FormButtons = ({ text, isSubmitting }: FormButtonsProps) => {
  let content;

  if (isSubmitting) {
    content = (
      <p className="flex items-center gap-2">
        <Loader className="animate-spin" />
        <span>Please wait...</span>
      </p>
    );
  } else {
    content = <p>{text}</p>;
  }

  return <Button className="mt-4 capitalize">{content}</Button>;
};

export default FormButtons;
