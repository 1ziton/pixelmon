import { Inject, Pipe, PipeTransform } from '@angular/core';
import { PokemonI18NService, POKEMON_I18N_TOKEN } from './i18n';

@Pipe({ name: 'i18n' })
export class I18nPipe implements PipeTransform {
  constructor(@Inject(POKEMON_I18N_TOKEN) private i18n: PokemonI18NService) {}

  transform(key: string, interpolateParams?: {}, isSafe?: boolean): string {
    return this.i18n.fanyi(key, interpolateParams, isSafe);
  }
}
