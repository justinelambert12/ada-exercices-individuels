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
    
    $this->expectOutputString($expectedDisplay);
    $beginningBoard->display();
  }

  public function testDisplayEmptyBoard(): void
  {
    $emptyBoard = new Board(0);
    $expectedDisplay = " A "." B "." C "." D "." E "." F "."\n"
    .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(0)')."\n"
    .sprintf('%1$s%1$s%1$s%1$s%1$s%1$s', '(0)')."\n"
    ." G "." H "." I "." J "." K "." L ";

    $this->expectOutputString($expectedDisplay);
    $emptyBoard->display();
  }

  public function testIsEmptyFunctionReturnsTrueWhenBoardEmpty(): void
  {
    $emptyBoard = new Board(0);
    $this->assertSame(true, $emptyBoard->isEmpty());
  }

  public function testIsEmptyFunctionReturnsFalseWhenBoardFilled(): void
  {
    $filledBoard = new Board(4);
    $this->assertSame(false, $filledBoard->isEmpty());
  }
}