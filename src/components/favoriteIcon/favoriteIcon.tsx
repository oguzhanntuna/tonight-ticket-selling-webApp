import { useDispatch, useSelector } from 'react-redux';
import './favoriteIcon.scss';

import * as favoritesActions from '../../store/actions/favorites';
import * as toastMessageActions from '../../store/actions/toastMessage';
import { IToastMessageData } from '../../models/interfaces/toastMessage/toastMessage';
import { IEventShowcaseEvent } from '../../models/interfaces/eventShowcase/event';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import favIconEmpty from '../../assets/icons/heart-outline.svg';
import favIconFull from '../../assets/icons/heart-full.svg';

interface IFavoriteIcon {
    eventToBeLiked: IEventShowcaseEvent;
    showFavoritesText: boolean;
}

const FavoriteIcon = (props: IFavoriteIcon): JSX.Element => {
    const { eventToBeLiked, showFavoritesText } = props;
    const { toggleFavorite } = favoritesActions;
    const { setToastMessage } = toastMessageActions;

    const favoriteEvents = useSelector((state: IApplicationState) => state.favorites.favoriteEvents);
    const dispatch = useDispatch();

    const isEventAlreadyInFavorites = favoriteEvents.some((event: any) => event?.id === eventToBeLiked.id);

    const toggleFavoriteHandler = () => {
        const toastMessageData: IToastMessageData = {
            messageType: 'warning',
            message: 'Warning Message!' 
        }

        dispatch(setToastMessage(toastMessageData));
        dispatch(toggleFavorite(eventToBeLiked));
    }

    return (
        <div className="addToFavoriteIconContainer" onClick={() => toggleFavoriteHandler()}>
            <div className="addToFavoriteIconContainer-addToFavoriteIcon">
                { 
                    isEventAlreadyInFavorites 
                        ? <img src={favIconFull} alt="full favorite icon" /> 
                        : <img src={favIconEmpty} alt="empty favorite icon" /> 
                }
            </div>
            { showFavoritesText && <span className="addToFavoriteIconContainer-favouritesText">Add To Favorites</span> }
        </div>
    );
}

export default FavoriteIcon;