import { Alert } from "react-bootstrap";
import LoadingSpinner from "./loading-spinner";

type LoadingErrorStateProps = {
  loading: boolean;
  error: string | null;
  errorLabel?: string;
  className?: string;
};

export default function LoadingErrorState({ loading, error, errorLabel = "Unable to load data", className = "" }: LoadingErrorStateProps) {
  if (loading) {
    return (
      <div className={`d-flex align-items-center justify-content-center h-100 ${className}`.trim()}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`d-flex align-items-center justify-content-center h-100 ${className}`}>
        <Alert variant="danger" className="mb-0 w-100 text-center">
          <div className="fw-semibold">{errorLabel}</div>
        </Alert>
      </div>
    );
  }

  return null;
}
