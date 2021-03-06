import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class BaseView {
    protected articlesCount: number = 0;
    protected weatherCount: number = 0;

    protected articlesToRender: string[] = [];
    protected weatherToRender: string[] = [];

    private type: string = ``;

    constructor(articlesCount: number, weatherCount: number, type: string) {
        this.articlesCount = articlesCount;
        this.weatherCount = weatherCount;
        this.type = type;
    }

    protected formatArticles(article: IArticle) {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    protected formatWeather(measurment: IMeasurement) {
        return `[${measurment.time}] ${measurment.temperature} C, ${measurment.pressure} P, ${
            measurment.humidity
        } U`;
    }

    protected updateData(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.articlesToRender = articles
                .slice(-this.articlesCount)
                .map(x => this.formatArticles(x));
        }
        if (observable instanceof WeatherState) {
            const measurments = observable.getMeasurements();
            this.weatherToRender = measurments
                .slice(-this.weatherCount)
                .map(x => this.formatWeather(x));
        }
    }

    protected getResultString() {
        const infoPart = this.articlesToRender.concat(this.weatherToRender).join('\n');
        return [`<div class="${this.type}">`, infoPart, '</div>'].join('\n');
    }
}
