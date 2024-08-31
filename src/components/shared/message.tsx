export function Message({ content }: { content: string }) {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <p className="font-semibold text-lg text-gray-500">{content}</p>
    </div>
  );
}
