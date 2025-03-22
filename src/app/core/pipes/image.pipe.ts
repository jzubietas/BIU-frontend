import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {
  
  transform(url: string, defaultImage: string = 'assets/default-image.png'): string {
    defaultImage = `${window.location.origin}/stb/p/${defaultImage}`;
    if (!url.includes('http')) {
      url = `${window.location.origin}/stb/p/${url}`;
    }
    return (url && url.trim() !== '') ? url : defaultImage;
  }

}
