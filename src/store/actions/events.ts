import axios from "axios";
import { EventShowcaseEvent } from "../../models/eventShowcase/event";
import { IEventsAction } from "../../models/interfaces/store/actions/events";

export const SET_THIS_WEEK_EVENTS = 'SET_THIS_WEEK_EVENTS';
export const SET_RECENTLY_ADDED_EVENTS = 'SET_RECENTLY_ADDED_EVENTS';
export const SET_BUY_NOW_EVENTS = 'SET_BUY_NOW_EVENTS';
export const SET_ALL_EVENTS = 'SET_ALL_EVENTS';
export const SET_SELECTED_EVENT = 'SET_SELECTED_EVENT';
export const ADD_NORMAL_TICKET = 'ADD_NORMAL_TICKET';
export const ADD_VIP_TICKET = 'ADD_VIP_TICKET';
export const REMOVE_NORMAL_TICKET = 'REMOVE_NORMAL_TICKET';
export const REMOVE_VIP_TICKET = 'REMOVE_VIP_TICKET';
export const SET_EVENT_ACTIVE = 'SET_EVENT_ACTIVE';
export const SET_EVENT_INACTIVE = 'SET_EVENT_INACTIVE';
export const RESET_TICKETS_COUNT = 'RESET_TICKETS_COUNT';

export const fetchThisWeekEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/this-week.json')
            .then(response => {
                const moduleData = response.data;
                const thisWeekEvents: Array<EventShowcaseEvent> = [];

                // if (thisWeekEvents.length > 0) {
                //     console.log('not empty');
                // } else {

                //     thisWeekEvents.push(new EventShowcaseEvent(
                //         moduleData[event].id,
                //         moduleData[event].title,
                //         moduleData[event].imageUrl,
                //         moduleData[event].location,
                //         moduleData[event].date,
                //         moduleData[event].redirectUrl,
                //         moduleData[event].normalTicket,
                //         moduleData[event].vipTicket,
                //         moduleData[event].totalPrice,
                //         'this-week'
                //     ));
                // }

                for (const event in moduleData) {
                    thisWeekEvents.push(new EventShowcaseEvent(
                        moduleData[event].id,
                        moduleData[event].title,
                        moduleData[event].imageUrl,
                        moduleData[event].location,
                        moduleData[event].date,
                        moduleData[event].redirectUrl,
                        moduleData[event].normalTicket,
                        moduleData[event].vipTicket,
                        moduleData[event].totalPrice,
                        'this-week'
                    ));
                }

                dispatch({
                    type: SET_THIS_WEEK_EVENTS,
                    // allEvents: buyNowEvents.concat(recentlyAddedEvents, thisWeekEvents),
                    thisWeekEvents: thisWeekEvents
                });
            })
            .catch(error => console.log(error));
    }
}

export const fetchRecentlyAddedEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/recently-added.json')
            .then(response => {
                const moduleData = response.data;
                const recentlyAddedEvents: Array<EventShowcaseEvent> = [];

                for (const event in moduleData) {
                    recentlyAddedEvents.push(new EventShowcaseEvent(
                        moduleData[event].id,
                        moduleData[event].title,
                        moduleData[event].imageUrl,
                        moduleData[event].location,
                        moduleData[event].date,
                        moduleData[event].redirectUrl,
                        moduleData[event].normalTicket,
                        moduleData[event].vipTicket,
                        moduleData[event].totalPrice,
                        'recently-added'
                    ));
                }

                dispatch({
                    type: SET_RECENTLY_ADDED_EVENTS,
                    recentlyAddedEvents: recentlyAddedEvents
                });
            })
            .catch(error => console.log(error))
    }
}

export const fetchBuyNowEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/modules/buy-now.json')
            .then(response => {
                const moduleData = response.data;
                const buyNowEvents: Array<EventShowcaseEvent> = [];

                for (const event in moduleData) {
                    buyNowEvents.push(new EventShowcaseEvent(
                        moduleData[event].id,
                        moduleData[event].title,
                        moduleData[event].imageUrl,
                        moduleData[event].location,
                        moduleData[event].date,
                        moduleData[event].redirectUrl,
                        moduleData[event].normalTicket,
                        moduleData[event].vipTicket,
                        moduleData[event].totalPrice,
                        'buy-now'
                    ));
                }

                dispatch({
                    type: SET_BUY_NOW_EVENTS,
                    buyNowEvents: buyNowEvents
                });
            })
            .catch(error => console.log(error))
    }
}

export const fetchAllEvents = () => {
    return async (dispatch: any) => {
        axios.get('https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events.json')
            .then(response => {
                const eventsData = response.data;
                const allEvents: Array<EventShowcaseEvent> = [];

                for (const event in eventsData) {
                    allEvents.push(new EventShowcaseEvent( 
                        eventsData[event].id,
                        eventsData[event].title,
                        eventsData[event].imageUrl,
                        eventsData[event].location,
                        eventsData[event].date,
                        eventsData[event].redirectUrl,
                        eventsData[event].normalTicket,
                        eventsData[event].vipTicket,
                        eventsData[event].totalPrice,
                        // Something wrong down here 
                        'buy-now'
                    ))
                }

                dispatch({
                    type: SET_ALL_EVENTS,
                    allEvents
                })
            })
            .catch(error => console.log(error));
    }
}

export const fetchSelectedEvent = (event: string) => {
    return async (dispatch: any) => {
        axios.get(`https://tonight-ticket-selling-website-default-rtdb.europe-west1.firebasedatabase.app/events/${event}.json`)
            .then(response => {
                const selectedEvent = response.data;
                
                dispatch({
                    type: SET_SELECTED_EVENT,
                    selectedEvent
                })
            })
            .catch(error => console.log(error));
    } 
}

export const addNormalTicket = (eventId: number): IEventsAction => {
    
    return { type: ADD_NORMAL_TICKET, eventId};
}

export const addVipTicket = (eventId: number): IEventsAction => {

    return { type: ADD_VIP_TICKET, eventId};
}

export const removeNormalTicket = (eventId: number): IEventsAction => {

    return { type: REMOVE_NORMAL_TICKET, eventId };
}

export const removeVipTicket = (eventId: number): IEventsAction => {

    return { type: REMOVE_VIP_TICKET, eventId };
}

export const setEventActive = (eventId: number): IEventsAction => {

    return { type: SET_EVENT_ACTIVE, eventId };
}

export const setEventInactive = (eventId: number): IEventsAction => {

    return { type: SET_EVENT_INACTIVE, eventId };
}

export const resetTicketsCount = (eventId: number): IEventsAction => {

    return { type: RESET_TICKETS_COUNT, eventId };
}