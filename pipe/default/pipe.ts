import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'NAME',
})
export class CNAMEPipe implements PipeTransform {
	transform(input: string, refresh = 0): any {
		return input;
	}
}
