type CoreConceptProps = {
  title: string;
  description: string;
  image: string;
};

export default function CoreConcept({ title, description, image }: CoreConceptProps) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}