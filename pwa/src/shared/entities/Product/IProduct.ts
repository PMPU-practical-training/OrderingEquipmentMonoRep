import {IBreadcrumb} from '../Base/IBreadcrumb';
import {IExpert} from '../User';
import {IQuantifiable} from '../Base/IQuantifiable';
import {IProductSpecification, IRangeProductSpecification} from '../Specification';

export interface IProduct {
    id: string;
    name: string;
    verifiedBy: IExpert | null;
    requiresVerification: boolean;
    price: IRangeProductSpecification<string>;
    specifications: IProductSpecification[];
    breadcrumbs: IBreadcrumb[];
}

export interface IQuantifiableProduct extends IProduct, IQuantifiable {
}
