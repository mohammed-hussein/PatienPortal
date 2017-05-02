export class RefillRequest {
    ID: string;
    created: string;
    requestStatus: string;
    rejectionReason: string;
    staffComment: string;
    receivingMethod: string;
    receivingDate: string;
    hospitalName: string= '';
    patientComment: string;
    drugName: string= '';
    mobile: string;
    otherMobile: string;
    city: string;

    IsPharmcy: boolean;
}
