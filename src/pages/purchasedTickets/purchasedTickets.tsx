import { useState } from 'react';
import { useSelector } from 'react-redux';
import './purchasedTickets.scss';

import { useScrollToTop } from '../../customHooks/useScrollToTop';
import { IApplicationState } from '../../models/interfaces/store/states/application';

import moreIcon from '../../assets/icons/more.svg';
import heroImage from '../../assets/hero.jpg';
import ticketIcon from '../../assets/icons/ticket/ticket-full.svg';
import HeroImage from '../../components/heroImage/HeroImage';
import EventTicket from '../../components/eventTicket/EventTicket';
import EmptyState from '../../components/emptyState/EmptyState';

const PurchasedTicketsPage = (): JSX.Element => {
    const orders = useSelector((state: IApplicationState) => state.orders.orders);
    const [isMinimizedOrderIndexArray, setIsMinimizedOrderIndexArray] = useState<Array<number>>([]);

    useScrollToTop();

    const minimizeOrder = (orderIndex: number) => {
        if (isMinimizedOrderIndexArray.includes(orderIndex)) {
            const newIsMinimizedOrderIndexArray = isMinimizedOrderIndexArray.filter(index => index !== orderIndex);

            setIsMinimizedOrderIndexArray(newIsMinimizedOrderIndexArray);
        } else {
            setIsMinimizedOrderIndexArray(isMinimizedOrderIndexArray => [...isMinimizedOrderIndexArray, orderIndex]);
        }
    }

    const renderPurchasedTickets = () => (
        <div className="orders">
            {
                orders.map((order, orderIndex) => {
                    const { date, purchasedTickets } = order;

                    return (
                        <div 
                            className={`
                                orders-orderContainer 
                                ${isMinimizedOrderIndexArray.includes(orderIndex) ? 'minimized' : ''} 
                            `}
                            key={`${orderIndex}-${date}`}
                        >
                            <div 
                                className="orders-header"
                                onClick={() => minimizeOrder(orderIndex)}
                            >
                                <p className="orders-orderDate">
                                    { date }
                                </p>
                                <div className='orders-minimizeOrderButton'>
                                    <img src={moreIcon} alt="more" />
                                </div>
                            </div>
                            {
                                isMinimizedOrderIndexArray.includes(orderIndex)
                                    ? <></>
                                    : (
                                        <div className="orders-purchasedTicketsContainer">
                                            <div className="orders-purchasedTicketsContainerOverlay" />
                                            <div className='orders-scrollableContent'>
                                                { 
                                                    purchasedTickets.map((purchasedTicket, index) => (
                                                        <div className="orders-purchasedTicket" key={purchasedTicket.id} >
                                                            <EventTicket eventData={purchasedTicket} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    )
                })
            }
        </div>
    );

    const renderEmptyState = (): JSX.Element => (
        
        <EmptyState 
            icon={ticketIcon}
            text="No tickets are purchased yet!"
        />
    );

    return (
        <div className="purchasedTicketsPage">
            <HeroImage imageUrl={heroImage} />
            <div className={`
                purchasedTicketsPageContainer 
                ${orders.length === 0 ? 'purchasedTicketsPageContainer--emptyState' : ''}`
            }>
                <div className="purchasedTicketsPageContainer-title">
                    Purchased Tickets
                </div>
                { 
                    orders && orders.length > 0
                        ? renderPurchasedTickets()
                        : renderEmptyState()
                }
            </div>
        </div>
    );
}

export default PurchasedTicketsPage;