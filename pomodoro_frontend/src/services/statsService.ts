const url = "http://localhost:8080/stats";

export const getTodayStats = async (): Promise<{today:number}> => {
    try {
        const response = await fetch(`${url}/today`);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: {today:number} = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to get today stats", error);
        throw error;
    }
}

export const getWeekStats = async (): Promise<{week:number}> => {
    try {
        const response = await fetch(`${url}/week`);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: {week:number} = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to get week stats", error);
        throw error;
    }
}

export const getStreakStats = async (): Promise<{streak:number}> => {
    try {
        const response = await fetch(`${url}/streak`);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: {streak:number} = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to get streak stats", error);
        throw error;
    }
}