import { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

import { IDropdownItem } from './Filters';

import EventShowcaseFilters from './Filters';
import moreIcon from '../../../assets/icons/more.svg';

interface IEventShowcaseHeaderProps {
    title: string;
    displayFilters: boolean;
    activeDayFilter: IDropdownItem;
    setActiveDayFilter: Dispatch<React.SetStateAction<IDropdownItem>>;
}

const EventShowcaseHeader = (props: IEventShowcaseHeaderProps): JSX.Element => {
    const { title, displayFilters, activeDayFilter, setActiveDayFilter } = props;
    const navigate = useNavigate();

    const convertTitleToRedirectUrl = (title: string) => {
        const splittedTitleArray = title.toLowerCase().split(' ');
        const redirectUrl = splittedTitleArray.join('-');

        return redirectUrl;
    }
    
    return (
        <div className="eventShowcaseHeader">
            <div className="eventShowcaseHeader-title">{title}</div>
            { 
                displayFilters && 
                <EventShowcaseFilters 
                    activeDayFilter={activeDayFilter} 
                    setActiveDayFilter={setActiveDayFilter} 
                />
            }
            <div 
                className="eventShowcaseHeader-moreButton"
                onClick={() => navigate(`/${convertTitleToRedirectUrl(title)}`)}
            >
                <div className="eventShowcaseHeader-text">
                    See All
                </div>
                <div className="eventShowcaseHeader-moreIcom">
                    <img src={moreIcon} alt="more icon" />
                </div>
            </div>
        </div>
    );
}

export default EventShowcaseHeader;