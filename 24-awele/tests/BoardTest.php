<?php declare(strict_types=1);
// Exemple de base avec PHP unit : https://phpunit.de/getting-started/phpunit-10.html
use PHPUnit\Framework\TestCase;

final class BoardTest extends TestCase
{
  public function testDisplayBeginningBoard(): void
  {
    $beginningBoard = new Board();
    $expectedDisplay = " A "." B "." C "." D "." E "." F "."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(4)')."\n"
      .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(4)')."\n"
      ." G "." H "." I "." J "." K "." L ";
    
    $this->assertSame($expectedDisplay, $beginningBoard->display());
  }

  public function testDisplayEmptyBoard(): void
  {
    $emptyBoard = new Board(0);
    $expectedDisplay = " A "." B "." C "." D "." E "." F "."\n"
    .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(0)')."\n"
    .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(0)')."\n"
    ." G "." H "." I "." J "." K "." L ";

    $this->assertSame($expectedDisplay, $emptyBoard->display());
  }
}