import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

@Injectable({providedIn: 'root'})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta
  ) {
  }

  removeHTMLTags = (str: string) => str.split(/<[^>]*>/).join('');

  updateMetaTags({
                   title = 'LTNG News',
                   description = 'High level experience in web design and development knowledge, producing quality work.',
                   image = 'https://ik.imagekit.io/ltngmedia/LTNG/NEWS/common/logo_aEmInCnx_.png',
                   url = environment.apiBaseUrl
                 }: SeoProps) {
    if (!title) return;

    this.title.setTitle(title);

    const tags = [
      {name: 'description', content: description && this.removeHTMLTags(description)},
      {property: 'og:title', content: title},
      {property: 'og:description', content: description && this.removeHTMLTags(description)},
      {property: 'og:image', content: image},
      {property: 'og:url', content: url},
      {property: 'og:type', content: 'article'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: title},
      {name: 'twitter:description', content: description && this.removeHTMLTags(description)},
      {name: 'twitter:image', content: image},
    ];

    for (const tag of tags) {
      // @ts-ignore
      this.meta.updateTag(tag);
    }
  }
}
