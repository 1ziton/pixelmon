import { Component, Inject } from '@angular/core';
import { POKEMON_I18N_TOKEN } from '@pokemon/theme';
import { I18NService } from '../../core/i18n/service';

@Component({
  selector: 'not-found',
  templateUrl: './404.component.html',
})
export class NotFoundComponent {
  constructor(@Inject(POKEMON_I18N_TOKEN) public i18n: I18NService) {}
}
