<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class PitTest extends TestCase
{
  public function testGetPitName(): void
  {
    $name = "A";
    $pit = new Pit($name);
    $this->assertSame($name, $pit->name);
  }

  public function testGetPitNumberOfSeeds(): void
  {
    $seeds = 3;
    $pit = new Pit("A", $seeds);
    $this->assertSame($seeds, $pit->seeds);
  }
}