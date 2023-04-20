import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTdContent]',
})
export class TdContentDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const rows = document.querySelectorAll('.row');
    for (let i = 0; i < rows.length; i++) {
      const btnGroup = rows[i].querySelector('.btns-group');
      if (
        btnGroup &&
        btnGroup !== (event.target as HTMLElement).parentElement
      ) {
        btnGroup.classList.remove('show');
      }
    }

    const parentElement = (event.target as HTMLElement).parentElement?.children;

    Array.from(parentElement || []).forEach((child: Element) => {
      const childrenElement = child.children;

      Array.from(childrenElement || []).forEach((el: Element) => {
        if (el.classList.contains('btns-group')) {
          el.classList.add('show');
        }
      });
    });
  }
}
