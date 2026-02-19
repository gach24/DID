/**
 * Interface for the reports
 */
interface Report{
  version:        number;
  permissionMask: number;
  creationDate:   Date;
  updateDate:     Date;
  label:          string;
  description:    string;
  uri:            string;
  resourceType:   string;
}
