const { useForm, FormProvider } = require('react-hook-form');
const { zodResolver } = require('@hookform/resolvers/zod');
const { z } = require('zod');

const schema = z.object({
  name: z.string(),
});

const form = {
  handleSubmit: (onSubmit) => {
    console.log('handleSubmit called with:', typeof onSubmit);
    return (e) => {
      console.log('Form submitted, event:', typeof e);
      // Simulate form handling
      onSubmit({ name: 'test' });
    };
  }
};

const onSubmit = (data) => {
  console.log('onSubmit called with:', data);
};

const handler = form.handleSubmit(onSubmit);
console.log('Handler type:', typeof handler);

// Simulate form submission
const event = { preventDefault: () => {} };
handler(event);
