import {Component, inject, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    NgForOf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  totalPages = input.required<number>();
  currentPage: number = 1;

  ngOnInit() {
    this.currentPage = parseInt(this.route.snapshot.params['page']);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.router.navigate(['/search',this.currentPage],{
      queryParamsHandling: 'preserve',
    });
  }

  get pages(): number[] {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage;

    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    }

    if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }


  getClassList(page: number): string {
    const baseClasses = 'flex items-center justify-center px-3 h-8 leading-tight disabled:cursor-default';
    const selectedClasses = 'relative z-10 bg-blue-50 text-blue-600 dark:bg-gray-600' +
      ' dark:text-white';
    const unselectedClasses = 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700' +
      ' dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';

    return page === this.currentPage
      ? `${baseClasses} ${selectedClasses}`
      : `${baseClasses} ${unselectedClasses}`;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages();
  }
}
