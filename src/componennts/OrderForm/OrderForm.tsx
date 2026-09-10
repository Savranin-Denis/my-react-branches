interface OrderFormProps {
  onSubmit: (value: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const order = formData.get("ordertype") as string;
    onSubmit(order);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="ordertype" />
      <button type="submit">Place order</button>
    </form>
  );
}
