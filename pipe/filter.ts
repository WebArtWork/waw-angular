import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'NAME'
})
export class CNAMEPipe implements PipeTransform {
	transform(input: any, refresh?): any {
		return input;
	}
}