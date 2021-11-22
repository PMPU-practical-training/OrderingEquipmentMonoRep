import {EditorOrderList} from '@components/EditorOrderList/EditorOrderList';
import {Footer} from '@components/Footer/Footer';
import {Header} from '@components/Header/Header';
import {UserData} from '@components/UserData/UserData';
import {UserOrderTable} from '@components/UserOrderTable/UserOrderTable';
import {RootState} from '@store';
import {LoadingStatus} from '@store/slices/user';
import {Container} from '@ui/Container/Container';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UserRole} from "../../shared/entities/User"; //'shared/entities/User';

export const ProfilePage = (): React.ReactElement => {
    const dispatch = useDispatch();
    const {role} = useSelector((state: RootState) => state.user.data);
    const loading = useSelector((state: RootState) => state.user.loading);

    const renderProfileComponent = () => {
        if (role && loading === LoadingStatus.Complete) {
            switch (role) {
                case UserRole.Admin:
                    return <EditorOrderList/>;
                case UserRole.Editor:
                case UserRole.Expert:
                case UserRole.Purchaser:
                    return <UserOrderTable/>;
                default:
                    return null;
            }
        } else {
            return null;
        }
    };

    return (
        <>
            <Header isInteractive/>
            <Container>
                <UserData/>
                {renderProfileComponent()}
                {/* <SubcatalogueMenu /> */}
            </Container>
            <Footer/>
        </>
    );
};
