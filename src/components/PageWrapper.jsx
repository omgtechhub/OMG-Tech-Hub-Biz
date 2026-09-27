import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PageWrapper({ children }) {
  useScrollReveal();
  return <div>{children}</div>;
}
