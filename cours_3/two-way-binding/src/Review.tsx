type ReviewProps = {
  feedback: string;
  student: string;
};

export default function Review({ feedback, student }: ReviewProps) {
  return (
    <figure>
      <blockquote>
        <p>{feedback}</p>
      </blockquote>
      <figcaption>{student}</figcaption>
    </figure>
  );
}
